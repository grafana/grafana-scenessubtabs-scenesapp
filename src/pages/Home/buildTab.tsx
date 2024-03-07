import {
  behaviors,
  CustomVariable,
  EmbeddedScene,
  SceneAppPage,
  SceneControlsSpacer,
  SceneFlexItem,
  SceneFlexLayout,
  SceneRefreshPicker,
  SceneTimePicker,
  SceneTimeRange,
  SceneVariableSet,
  VariableValueSelectors,
} from '@grafana/scenes';
import { prefixRoute } from '../../utils/routing';
import { ROUTES } from '../../constants';
import { locationService } from '@grafana/runtime';

interface BuildTabOptions {
  title: string; // The title that will get rendered in the tabs bar
  pathName: string; // The segment of the URL that will be used to identify the tab
  getPanels: () => EmbeddedScene; // A function that will be called to get the panels of the tab
  subTabs: Array<{
    option: string; // The value that will be displayed in the dropdown. We are encapsulating everything in an EmbeddedScene for easier reading
    getPanels: () => EmbeddedScene; // The scene that will be rendered when this value is picked. We are encapsulating everything in an EmbeddedScene for easier reading
  }>;
}

export const buildTab = ({ title, pathName, getPanels, subTabs }: BuildTabOptions) => {
  return new SceneAppPage({
    title,

    url: prefixRoute(`${ROUTES.Home}/${pathName}`),

    getScene: () => {
      const urlSubTab = locationService.getSearchObject()['var-subTab'] ?? '';
      const selectedSubTab = subTabs.find(({ option }) => option === urlSubTab) ?? subTabs[0];

      // We want to keep a reference to this in order to re-render only the sub-tab body and not the entire dashboard
      const subTabBody = new SceneFlexItem({ body: selectedSubTab?.getPanels() });

      return new EmbeddedScene({
        $timeRange: new SceneTimeRange(),

        $variables: new SceneVariableSet({
          variables: [
            // This variable will be used to control what sub-tab is displayed
            new CustomVariable({
              name: 'subTab',
              label: 'Sub-tab',
              query: subTabs.map(({ option }) => option).join(','),
            }),
          ],
        }),

        controls: [
          new VariableValueSelectors({}),
          new SceneControlsSpacer(),
          new SceneTimePicker({ isOnCanvas: true }),
          new SceneRefreshPicker({ isOnCanvas: true }),
        ],

        body: new SceneFlexLayout({
          direction: 'column',
          children: [new SceneFlexItem({ body: getPanels() }), subTabBody],
        }),

        $behaviors: [
          // When the subTab variable changes, we want to update the subTabBody with the panels for this sub-tab
          new behaviors.ActWhenVariableChanged({
            variableName: 'subTab',
            onChange: (variable) => {
              const value = variable.getValue();
              const subTab = subTabs.find(({ option }) => option === value);

              subTabBody.setState({ body: subTab?.getPanels() });
            },
          }),
        ],
      });
    },
  });
};
