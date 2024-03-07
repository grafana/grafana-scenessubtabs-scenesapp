import React from 'react';

import { EmbeddedScene, SceneApp, SceneAppPage, SceneFlexLayout, useSceneApp } from '@grafana/scenes';

import { ROUTES } from '../../constants';
import { prefixRoute } from '../../utils/routing';
import { buildTab } from './buildTab';
import { getSubTabOneAPanels, getSubTabOneBPanels, getTabOnePanels } from './tabOne';
import { getSubTabTwoCPanels, getSubTabTwoDPanels, getTabTwoPanels } from './tabTwo';

const getApp = () =>
  new SceneApp({
    pages: [
      new SceneAppPage({
        title: 'Page with tabs',
        subTitle: 'This scene showcases a basic tabs functionality.',
        url: prefixRoute(`${ROUTES.Home}`),
        hideFromBreadcrumbs: true,
        // This Scene won't get loaded, hence we are defining an empty Scene
        getScene: () => new EmbeddedScene({ body: new SceneFlexLayout({ children: [] }) }),
        tabs: [
          buildTab({
            title: 'Tab 1',
            pathName: 'one',
            getPanels: getTabOnePanels,
            subTabs: [
              { option: 'a', getPanels: getSubTabOneAPanels },
              { option: 'b', getPanels: getSubTabOneBPanels },
            ],
          }),

          buildTab({
            title: 'Tab 2',
            pathName: 'two',
            getPanels: getTabTwoPanels,
            subTabs: [
              { option: 'c', getPanels: getSubTabTwoCPanels },
              { option: 'd', getPanels: getSubTabTwoDPanels },
            ],
          }),
        ],
      }),
    ],
  });

export const Home = () => {
  const scene = useSceneApp(getApp);

  return <scene.Component model={scene} />;
};
