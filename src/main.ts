import "./css/style.css";
import FullList from "./model/FullList";
import List from "./model/List";
import ListTemplate from "./templates/ListTemplate";

const init = (): void => {
  const fullList = FullList.instance;
  const templates = ListTemplate.instance;

  const itemForm = document.getElementById("itemEntryForm") as HTMLFormElement;
  itemForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntery: string = input.value.trim();
    if (!newEntery.length) return;
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newItem = new List(itemId.toString(), newEntery);
    fullList.addItem(newItem);
    templates.render(fullList);
    input.value = "";
  });
  const clear = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clear.addEventListener("click", (): void => {
    fullList.clearList();
    templates.clear();
  });
  fullList.load();
  templates.render(fullList);
};

document.addEventListener("DOMContentLoaded", init);
