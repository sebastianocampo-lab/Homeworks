export class Node{
    value: any;
    next: Node | null;

    constructor(value: any){
        this.value = value;
        this.next = null;

    }
}

export class LinkedList {
    head: Node | null;
    tail: Node | null;
    length: number;

    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
        
    }

    append(value: any){
        const newNode = new Node(value);
        
        if(!this.head){
            this.head = newNode;
        } else {
            this.tail!.next = newNode;

        }
        this.tail = newNode;
        this.length++;
    }
    
    peek(value: any, current: Node |null = this.head): Node | null {
        while(current){
            if (current.value === value)
                return current;
        }
        return null;
    }

    size(){
        return this.length;
    }

    remove(value: any, current: Node | null = this.head): void {
        if (!this.head) return;

        if (this.head.value === value){
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.length--;
            return;
        }

        current = this.head;
        while (current.next && current.next.value !==value){
            current = current.next;
        }

        if(current.next){
            current.next = current.next.next;
            if (!current.next) this.tail = current;
            this.length--;
        
        }
    }

    print() {
        let current = this.head;
        let result = "";
        while (current){
            result += current.value + "-> ";
            current = current.next;
        }
        console.log(result + "null");
    }

}