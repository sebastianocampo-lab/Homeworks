export class Graph {
    nodes: string[];
    adjList: { [node: string]: string[] };

    constructor() {
        this.nodes = [];
        this.adjList = {};
    }

    addNode(node: string): void {
        if (!this.searchNode(node)) {
            this.nodes.push(node);
            this.adjList[node] = [];
        }
    }
    addEdge(node1: string, node2: string): void {
        if (!this.searchNode(node1) || !this.searchNode(node2)) return;
        if (this.adjList[node1].includes(node2)) return;

        this.adjList[node1].push(node2);
        this.adjList[node2].push(node1);
    }

    searchNode(node: string): string | undefined {
        return this.nodes.find((n) => n === node);
    }

    printAdjacency(node: string): string[] {
        if (!this.searchNode(node)) return [];
        return this.adjList[node];
    }

    isEmpty(): boolean {
        return this.nodes.length === 0;
    }

    removeNode(node: string): void {
        if (!this.searchNode(node)) return;

        for (let vecino of this.adjList[node]) {
            this.adjList[vecino] = this.adjList[vecino].filter((n) => n !== node);
        }

        delete this.adjList[node];
        this.nodes = this.nodes.filter((n) => n !== node);
    }

    print(): void {
        console.log(this.adjList);
    }
}