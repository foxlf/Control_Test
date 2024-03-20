const model = [
    {
        type: "buttons",
        value: [
            {
                type: "button",
                value: "Move Up",
                class: "button",
                id: "moveAvailableUp",
            },
            {
                type: "button",
                value: "Move max Up",
                class: "button",
                id: "moveAvailableMaxUp",
            },
            {
                type: "button",
                value: "Move max Down",
                class: "button",
                id: "moveAvailableMaxDown",
            },
            {
                type: "button",
                value: "Move Down",
                class: "button",
                id: "moveAvailableDown",
            },
        ],
        class: "sorting",
    },
    {
        type: "variables",
        value: [
            {
                type: "variablesHead",
                value: [
                    {
                        type: "text",
                        value: "Available",
                        class: "text",
                    },
                    {
                        type: "search",
                        value: "Search",
                        class: "search",
                        id: "searchAvailable",
                    },
                ],
                class: "container-variables__head",
            },
            {
                type: "variablesBody",
                value: [
                    {
                        type: "item",
                        value: "watch",
                        class: "available-item",
                        display: true,
                        selected: false,
                    },
                    {
                        type: "item",
                        value: "car",
                        class: "available-item",
                        display: true,
                        selected: false,
                    },
                    {
                        type: "item",
                        value: "bracelet",
                        class: "available-item",
                        display: true,
                        selected: false,
                    },
                    {
                        type: "item",
                        value: "computer",
                        class: "available-item",
                        display: true,
                        selected: false,
                    },
                    {
                        type: "item",
                        value: "phone",
                        class: "available-item",
                        display: true,
                        selected: false,
                    },
                ],
                class: "variables-available__body",
            },
        ],
        class: "variables",
    },
    {
        type: "buttons",
        value: [
            {
                type: "button",
                value: ">",
                class: "button",
                id: "availableToSelected",
            },
            {
                type: "button",
                value: ">>",
                class: "button",
                id: "allAvailableToSelected",
            },
            {
                type: "button",
                value: "<<",
                class: "button",
                id: "allSelectedToAvailable",
            },
            {
                type: "button",
                value: "<",
                class: "button",
                id: "selectedToAvailable",
            },
            {
                type: "button",
                value: "Reset",
                class: "button",
                id: "reset",
            },
            {
                type: "button",
                value: "Add new Control",
                class: "button",
                id: "newControl",
            },
            {
                type: "button",
                value: "Get state in console",
                class: "button",
                id: "getState",
            },
        ],
        class: "sorting",
    },
    {
        type: "variables",
        value: [
            {
                type: "variablesHead",
                value: [
                    {
                        type: "text",
                        value: "Selected",
                        class: "text",
                    },
                    {
                        type: "search",
                        value: "Search",
                        class: "search",
                        id: "searchSelected",
                    },
                ],
                class: "container-variables__head",
            },
            {
                type: "variablesBody",
                value: [],
                class: "variables-selected__body",
            },
        ],
        class: "variables",
    },
    {
        type: "buttons",
        value: [
            {
                type: "button",
                value: "Move Up",
                class: "button",
                id: "moveSelectedUp",
            },
            {
                type: "button",
                value: "Move max Up",
                class: "button",
                id: "moveSelectedMaxUp",
            },
            {
                type: "button",
                value: "Move max Down",
                class: "button",
                id: "moveSelectedMaxDown",
            },
            {
                type: "button",
                value: "Move Down",
                class: "button",
                id: "moveSelectedDown",
            },
        ],
        class: "sorting",
    },
];

class Control {
    constructor(model) {
        this.model = JSON.parse(JSON.stringify(model));
    }

    init() {
        const render = new Render(this.model);
        render.render(this.model);
    }
}

class Render {
    constructor(model) {
        this.element = document
            .getElementById("main")
            .appendChild(document.createElement("div"));
        this.element.classList.add("container");
        this.model = model;
        this.pickedAvailableItems = [];
        this.pickedSelectedItems = [];
    }

    buttonsBlock(value, classname) {
        let html = value.map(
            (item) =>
                `<button class=${item.class} id=${item?.id}>${item.value}</button>`
        );
        return `<div class=${classname}>${html.join("")}</div>`;
    }

    variablesBlock(value, classname) {
        let html = value.map((item) => {
            let htmlMap = "";
            if (item.type === "variablesHead") {
                htmlMap = item.value.map((item) =>
                    item.type === "text"
                        ? `<p class=${item.class}>${item.value}</p>`
                        : `<input class=${item.class} placeholder=${item.value} id=${item?.id} />`
                );
            } else if (item.type === "variablesBody") {
                htmlMap = item.value.map(
                    (item) => `<div class=${item.class}>${item.value}</div>`
                );
            }
            return `<div class=${item.class}>${htmlMap.join("")}</div>`;
        });
        return `<div class=${classname}>${html.join("")}</div>`;
    }

    search(item, searchValue) {
        let str = item.value.indexOf(searchValue);
        if (!(str + 1)) {
            item.display = false;
            return "";
        } else {
            item.display = true;
            return `<div class=${item.class}>${item.value}</div>`;
        }
    }

    firstAvailableToSelected(e) {
        let item = this.model[1].value[1].value.shift();
        item.class = "selected-item";
        this.model[3].value[1].value.push(item);
        this.render(this.model);
    }

    firstSelectedToAvailable(e) {
        let item = this.model[3].value[1].value.shift();
        item.class = "available-item";
        this.model[1].value[1].value.push(item);
        this.render(this.model);
    }

    searchAvailable(e) {
        this.render(this.model, true, e.target.value, "available");
    }

    searchSelected(e) {
        this.render(this.model, true, e.target.value, "selected");
    }

    pickedAvailableHandler(e) {
        let i;
        if (e.target.classList.contains("variables-available__body")) return;
        if (
            (i = this.pickedAvailableItems.indexOf(e.target.outerText)) === -1
        ) {
            this.pickedAvailableItems.push(e.target.outerText);
        } else {
            this.pickedAvailableItems.splice(i, 1);
        }
        e.target.classList.toggle("picked");
    }

    pickedAvailableToSelectedHandler(e) {
        let index = [];
        this.pickedAvailableItems.forEach((pickedItem) => {
            this.model[1].value[1].value.forEach(
                (availableItem, availableIndex) => {
                    if (availableItem.value === pickedItem) {
                        index.push(availableIndex);
                    }
                }
            );
        });
        index.forEach((i) => {
            let item = this.model[1].value[1].value.splice(i, 1);
            item[0].class = "selected-item";
            item[0].selected = false;
            this.model[3].value[1].value.push(item[0]);
        });
        this.pickedAvailableItems = [];
        this.pickedSelectedItems = [];
        this.render(this.model);
    }

    pickedSelectedHandler(e) {
        let i;
        if (e.target.classList.contains("variables-selected__body")) return;
        if ((i = this.pickedSelectedItems.indexOf(e.target.outerText)) === -1) {
            this.pickedSelectedItems.push(e.target.outerText);
        } else {
            this.pickedSelectedItems.splice(i, 1);
        }
        e.target.classList.toggle("picked");
    }

    pickedSelectedToAvailableHandler(e) {
        let index = [];
        this.pickedSelectedItems.forEach((pickedItem) => {
            this.model[3].value[1].value.forEach(
                (selectedItem, availableIndex) => {
                    if (selectedItem.value === pickedItem) {
                        index.push(availableIndex);
                    }
                }
            );
        });
        index.forEach((i) => {
            let item = this.model[3].value[1].value.splice(i, 1);
            item[0].class = "available-item";
            item[0].selected = false;
            this.model[1].value[1].value.push(item[0]);
        });
        this.pickedAvailableItems = [];
        this.pickedSelectedItems = [];
        this.render(this.model);
    }

    allAvailableToSelectedHandler(e) {
        this.model[1].value[1].value.forEach((item) => {
            item.class = "selected-item";
            item.selected = false;
            this.model[3].value[1].value.push(item);
        });
        this.model[1].value[1].value = [];
        this.pickedAvailableItems = [];
        this.pickedSelectedItems = [];
        this.render(this.model);
    }

    allSelectedToAvailableHandler(e) {
        this.model[3].value[1].value.forEach((item) => {
            item.class = "available-item";
            item.selected = false;
            this.model[1].value[1].value.push(item);
        });
        this.model[3].value[1].value = [];
        this.pickedAvailableItems = [];
        this.pickedSelectedItems = [];
        this.render(this.model);
    }

    movingAvailableButtonHandler(e) {
        let availableAllIndex = [];
        let selectedAllIndex = [];
        this.pickedAvailableItems.forEach((item) => {
            this.model[1].value[1].value.forEach(
                (availableItem, availableIndex) => {
                    if (availableItem.value === item) {
                        availableAllIndex.push(availableIndex);
                    }
                }
            );
        });
        this.pickedSelectedItems.forEach((item) => {
            this.model[3].value[1].value.forEach(
                (selectedItems, selectedIndex) => {
                    if (selectedItems.value === item) {
                        selectedAllIndex.push(selectedIndex);
                    }
                }
            );
        });
        if (e.target.id === "moveAvailableUp") {
            if (availableAllIndex.includes(0)) return;

            this.replacingItems(availableAllIndex, "toMax", 1);
        } else if (e.target.id === "moveAvailableDown") {
            if (
                availableAllIndex.includes(
                    this.model[1].value[1].value.length - 1
                )
            ) {
                return;
            }

            this.replacingItems(availableAllIndex, "toMin", 1);
        } else if (e.target.id === "moveSelectedUp") {
            if (selectedAllIndex.includes(0)) return;

            this.replacingItems(selectedAllIndex, "toMax", 3);
        } else if (e.target.id === "moveSelectedDown") {
            if (
                selectedAllIndex.includes(
                    this.model[3].value[1].value.length - 1
                )
            ) {
                return;
            }

            this.replacingItems(selectedAllIndex, "toMin", 3);
        }

        this.pickedSelectedItems = [];
        this.pickedAvailableItems = [];
        this.render(this.model);
    }

    replacingItems(index, sort, availableOrSelected) {
        if (sort === "toMax") {
            index
                .sort((a, b) => a - b)
                .forEach((i) => {
                    [
                        this.model[availableOrSelected].value[1].value[i],
                        this.model[availableOrSelected].value[1].value[i - 1],
                    ] = [
                        this.model[availableOrSelected].value[1].value[i - 1],
                        this.model[availableOrSelected].value[1].value[i],
                    ];
                });
        } else if (sort === "toMin") {
            index
                .sort((a, b) => b - a)
                .forEach((i) => {
                    [
                        this.model[availableOrSelected].value[1].value[i],
                        this.model[availableOrSelected].value[1].value[i + 1],
                    ] = [
                        this.model[availableOrSelected].value[1].value[i + 1],
                        this.model[availableOrSelected].value[1].value[i],
                    ];
                });
        }
    }

    movingMaxButtonHandler(e) {
        let availableAllIndex = [];
        let selectedAllIndex = [];
        this.pickedAvailableItems.forEach((item) => {
            this.model[1].value[1].value.forEach(
                (availableItem, availableIndex) => {
                    if (availableItem.value === item) {
                        availableAllIndex.push(availableIndex);
                    }
                }
            );
        });
        this.pickedSelectedItems.forEach((item) => {
            this.model[3].value[1].value.forEach(
                (selectedItems, selectedIndex) => {
                    if (selectedItems.value === item) {
                        selectedAllIndex.push(selectedIndex);
                    }
                }
            );
        });
        if (e.target.id === "moveAvailableMaxUp") {
            if (availableAllIndex.includes(0)) return;

            this.replacingItemsMax(availableAllIndex, "toUp", 1);
        } else if (e.target.id === "moveAvailableMaxDown") {
            if (
                availableAllIndex.includes(
                    this.model[1].value[1].value.length - 1
                )
            ) {
                return;
            }

            this.replacingItemsMax(availableAllIndex, "toDown", 1);
        } else if (e.target.id === "moveSelectedMaxUp") {
            if (availableAllIndex.includes(0)) return;

            this.replacingItemsMax(selectedAllIndex, "toUp", 3);
        } else if (e.target.id === "moveSelectedMaxDown") {
            if (
                availableAllIndex.includes(
                    this.model[1].value[1].value.length - 1
                )
            ) {
                return;
            }

            this.replacingItemsMax(selectedAllIndex, "toDown", 3);
        }
        this.pickedSelectedItems = [];
        this.pickedAvailableItems = [];
        this.render(this.model);
    }

    replacingItemsMax(index, sort, availableOrSelected) {
        if (sort === "toUp") {
            let s = 0;
            index
                .sort((a, b) => a - b)
                .forEach((i) => {
                    [
                        this.model[availableOrSelected].value[1].value[i],
                        this.model[availableOrSelected].value[1].value[s],
                    ] = [
                        this.model[availableOrSelected].value[1].value[s],
                        this.model[availableOrSelected].value[1].value[i],
                    ];
                    s++;
                });
        } else if (sort === "toDown") {
            let s = this.model[availableOrSelected].value[1].value.length - 1;
            index
                .sort((a, b) => b - a)
                .forEach((i) => {
                    [
                        this.model[availableOrSelected].value[1].value[i],
                        this.model[availableOrSelected].value[1].value[s],
                    ] = [
                        this.model[availableOrSelected].value[1].value[s],
                        this.model[availableOrSelected].value[1].value[i],
                    ];
                    s--;
                });
        }
    }

    reset(e) {
        this.model = JSON.parse(JSON.stringify(model));
        this.render(model);
    }

    addNewControl(e) {
        let words = [
            "phone",
            "car",
            "bracelet",
            "watch",
            "purse",
            "computer",
            "t-shirt",
            "sneakers",
            "bike",
            "lamp",
            "cup",
            "chocolate",
            "jeans",
            "jacket",
            "glasses",
            "monitor",
        ];
        let modelWords = [];
        let amount = Math.floor(Math.random() * words.length);
        for (let i = 0; i < amount; i++) {
            let word = words[Math.floor(Math.random() * words.length)];
            if (modelWords.indexOf(word) === -1) {
                modelWords.push(word);
            }
        }
        let newModel = JSON.parse(JSON.stringify(model));
        modelWords.forEach((item, i) => {
            newModel[1].value[1].value[i] = {
                type: "item",
                value: item,
                class: "available-item",
                display: true,
                selected: false,
            };
        });
        new Control(newModel).init();
    }

    getStateInConsole(e) {
        console.log("Available: ", this.model[1].value[1].value);
        console.log("Selected: ", this.model[3].value[1].value);
    }

    render(model, update = false, searchValue = "", searchSpace = "") {
        this.model = model;
        if (!update) {
            this.element.innerHTML = "";
            model.forEach((block) => {
                let html = "";
                if (block.type === "buttons") {
                    html = this.buttonsBlock(block.value, block.class);
                } else if (block.type === "variables") {
                    html = this.variablesBlock(block.value, block.class);
                }
                this.element.insertAdjacentHTML("beforeend", html);
            });
            const moveAvailableToSelectedButton = this.element.querySelector(
                "#availableToSelected"
            );
            const moveSelectedToAvailableButton = this.element.querySelector(
                "#selectedToAvailable"
            );
            const moveAllAvailableToSelectedButton = this.element.querySelector(
                "#allAvailableToSelected"
            );
            const moveAllSelectedToAvailableButton = this.element.querySelector(
                "#allSelectedToAvailable"
            );
            const moveAvailableUpButton =
                this.element.querySelector("#moveAvailableUp");
            const moveAvailableDownButton =
                this.element.querySelector("#moveAvailableDown");
            const moveSelectedUpButton =
                this.element.querySelector("#moveSelectedUp");
            const moveSelectedDownButton =
                this.element.querySelector("#moveSelectedDown");
            const moveMaxAvailableUpButton = this.element.querySelector(
                "#moveAvailableMaxUp"
            );
            const moveMaxAvailableDownButton = this.element.querySelector(
                "#moveAvailableMaxDown"
            );
            const moveMaxSelectedUpButton =
                this.element.querySelector("#moveSelectedMaxUp");
            const moveMaxSelectedDownButton = this.element.querySelector(
                "#moveSelectedMaxDown"
            );
            const resetButton = this.element.querySelector("#reset");
            const newControlButton = this.element.querySelector("#newControl");
            const getStateButton = this.element.querySelector("#getState");

            const inputAvailable =
                this.element.querySelector("#searchAvailable");
            const inputSelected = this.element.querySelector("#searchSelected");
            const pickedAvailable = this.element.querySelector(
                ".variables-available__body"
            );
            const pickedSelected = this.element.querySelector(
                ".variables-selected__body"
            );
            moveAvailableToSelectedButton.addEventListener(
                "click",
                this.pickedAvailableToSelectedHandler.bind(this)
            );
            moveSelectedToAvailableButton.addEventListener(
                "click",
                this.pickedSelectedToAvailableHandler.bind(this)
            );
            moveAllAvailableToSelectedButton.addEventListener(
                "click",
                this.allAvailableToSelectedHandler.bind(this)
            );
            moveAllSelectedToAvailableButton.addEventListener(
                "click",
                this.allSelectedToAvailableHandler.bind(this)
            );
            moveAvailableUpButton.addEventListener(
                "click",
                this.movingAvailableButtonHandler.bind(this)
            );
            moveAvailableDownButton.addEventListener(
                "click",
                this.movingAvailableButtonHandler.bind(this)
            );
            moveSelectedUpButton.addEventListener(
                "click",
                this.movingAvailableButtonHandler.bind(this)
            );
            moveSelectedDownButton.addEventListener(
                "click",
                this.movingAvailableButtonHandler.bind(this)
            );
            moveMaxAvailableUpButton.addEventListener(
                "click",
                this.movingMaxButtonHandler.bind(this)
            );
            moveMaxAvailableDownButton.addEventListener(
                "click",
                this.movingMaxButtonHandler.bind(this)
            );
            moveMaxSelectedUpButton.addEventListener(
                "click",
                this.movingMaxButtonHandler.bind(this)
            );
            moveMaxSelectedDownButton.addEventListener(
                "click",
                this.movingMaxButtonHandler.bind(this)
            );
            resetButton.addEventListener("click", this.reset.bind(this));
            newControlButton.addEventListener(
                "click",
                this.addNewControl.bind(this)
            );
            getStateButton.addEventListener(
                "click",
                this.getStateInConsole.bind(this)
            );

            inputAvailable.addEventListener(
                "input",
                this.searchAvailable.bind(this)
            );
            inputSelected.addEventListener(
                "input",
                this.searchSelected.bind(this)
            );
            pickedAvailable.addEventListener(
                "click",
                this.pickedAvailableHandler.bind(this)
            );
            pickedSelected.addEventListener(
                "click",
                this.pickedSelectedHandler.bind(this)
            );
        } else if (searchSpace === "available") {
            const availableBody = this.element.querySelector(
                ".variables-available__body"
            );
            availableBody.innerHTML = "";
            model[1].value[1].value.map((item) => {
                let html = "";
                html = this.search(item, searchValue);
                availableBody.insertAdjacentHTML("beforeend", html);
            });
        } else if (searchSpace === "selected") {
            const selectedBody = this.element.querySelector(
                ".variables-selected__body"
            );
            selectedBody.innerHTML = "";
            model[3].value[1].value.map((item) => {
                let html = "";
                html = this.search(item, searchValue);
                selectedBody.insertAdjacentHTML("beforeend", html);
            });
        }
    }
}

new Control(model).init();

