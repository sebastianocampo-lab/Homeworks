export class Node {
  value: string | null;
  isEndOfWord: boolean;
  children: { [letra: string]: Node };

  constructor(value: string | null) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
  }
}

export class Trie {
  root: Node;

  constructor() {
    this.root = new Node(null);
  }

  insert(word: string): void {
    let current = this.root;

    for (let letra of word.toLowerCase()) {
      if (current.children[letra] === undefined) {
        current.children[letra] = new Node(letra);
      }
      current = current.children[letra];
    }

    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    let current = this.root;

    for (let letra of word.toLowerCase()) {
      if (current.children[letra] === undefined) {
        return false;
      }
      current = current.children[letra];
    }

    return current.isEndOfWord;
  }

    sugerencias(prefijo: string): string[] {
    let current = this.root;
    prefijo = prefijo.toLowerCase();

    for (let letra of prefijo) {
      if (current.children[letra] === undefined) {
        return [];
      }
      current = current.children[letra];
    }

    const palabras: string[] = [];
    this.recorrer(current, prefijo, palabras);
    return palabras;
  }

  private recorrer(nodo: Node, palabra: string, palabras: string[]): void {
    if (nodo.isEndOfWord) {
      palabras.push(palabra);
    }

    for (let letra in nodo.children) {
      this.recorrer(nodo.children[letra], palabra + letra, palabras);
    }
  }
}