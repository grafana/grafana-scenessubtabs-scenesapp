import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from '@grafana/scenes';

export function getTabOnePanels() {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          minHeight: 300,
          body: PanelBuilders.timeseries().setTitle(`Example Panel from Tab One`).build(),
        }),

        new SceneFlexItem({
          minHeight: 300,
          body: PanelBuilders.timeseries().setTitle(`Another Panel from Tab One`).build(),
        }),
      ],
    }),
  });
}
