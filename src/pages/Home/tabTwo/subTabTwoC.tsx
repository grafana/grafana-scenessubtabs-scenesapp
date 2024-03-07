import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from '@grafana/scenes';

export function getSubTabTwoCPanels() {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          minHeight: 300,
          body: PanelBuilders.timeseries().setTitle(`Example Panel from Tab Two Sub-tab C`).build(),
        }),
      ],
    }),
  });
}
