import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from '@grafana/scenes';

export function getSubTabOneBPanels() {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          minHeight: 300,
          body: PanelBuilders.timeseries().setTitle(`Example Panel from Tab One Sub-tab B`).build(),
        }),
      ],
    }),
  });
}
