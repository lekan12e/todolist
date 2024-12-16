import List from "./List";

interface ListItem {
  list: List[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(objItem: List): void;
  removeItem(id: string): void;
}

export default class FullList implements ListItem {
  static instance: FullList = new FullList();
  private constructor(private _list: List[] = []) {}
  get list(): List[] {
    return this._list;
  }
  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") {
      return;
    }
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);
    parsedList.forEach((itemObj) => {
      const newListItem = new List(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
    });
  }
  save(): void {
    localStorage.setItem("mylist", JSON.stringify(this._list));
  }
  clearList(): void {
    this._list = [];
    this.save();
  }
  addItem(objItem: List): void {
    this._list.push(objItem);
    this.save();
  }
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
