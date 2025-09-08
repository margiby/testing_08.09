import { MouseEvent } from "react";
import type { Node } from "@xyflow/react";
import type { DiagramNode } from "../data/flow-types";
import useDiagramStore from "../diagrammHooks/useDiagramStore";
import { diagramRegistry } from "./diagramRegistry";

/**
 * Handler für Node-Klicks mit Collapse-Support für treeConfig-Diagramme.
 */
export default function diagramNodeClickHandler(
  toggleCollapse: (id: string) => void
) {
  return function handleNodeClick(
    event: MouseEvent,
    node: Node<DiagramNode["data"]>
  ): void {
    event.preventDefault();

    const { setTableData, setTableTitle, setDiagramId } =
      useDiagramStore.getState();
    const diagramId = node.id;
    const current = useDiagramStore.getState().diagramId;
    const currentDiagram = diagramRegistry[current];

    // Tabellendaten setzen wenn vorhanden
    if (node.data.table) {
      setTableData(node.data.table);
      setTableTitle(node.data.cleanLabel || (node.data.label as string));
      return;
    }

    // Collapse für treeConfig-Diagramme
    if (currentDiagram && currentDiagram.treeConfig) {
      toggleCollapse(diagramId);
      return;
    }

    // Zu Subdiagramm wechseln
    if (diagramRegistry[diagramId]) {
      setDiagramId(diagramId);
      setTableData(null);
      setTableTitle(null);
    } else {
      console.log("Kein Diagramm für:", diagramId);
    }
  };
}
