// Good - класс для хранения данных о товаре со свойствами:
// id            Код товара
// name          Наименование
// description   Описание
// sizes         массив возможных размеров
// price         цена товара
// available     Признак доступности для продажи

// Реализауйте в Good следующие методы:
// конструктор экземпляра товара принимающий параметры соответствующие свойствам выше
// изменение признака доступности для продажи (работает)

class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable() {
            return this.available = true
    }  
}

// GoodsList - класс для хранения каталога товаров со свойствами:
// constructor()   конструктор экземпляра товара принимающий параметры соответствующие свойствам выше

// #goods       массив экземпляров объектов класса Good (приватное поле)
// filter       регулярное выражение используемое для фильтрации товаров по полю name
// sortPrice    булево значение, признак включения сортировки по полю Price
// sortDir      булево значение, признак направления сортировки по полю Price (true - по возрастанию, false - по убыванию)

// get list()     возвращает массив доступных для продажи товаров в соответствии с установленным фильтром и сортировкой по полю Price
// add()          добавление товара в каталог
// remove(id)     удаление товара из каталога по его id

class GoodsList {
    #goods = [];
    
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        let temporaryList = [];
        
        for (let index = 0; index < this.#goods.length; index++) {
            // console.log(this.#goods[index].name)
            if (this.filter.test(this.#goods[index].name) === true) {

                temporaryList.push(this.#goods[index]);
                }
            }  

        let sortedList = function(a,b) { 

            if (this.sortPrice === true) {
                // Вызовите несколько раз реализованные методы этих объектов с необходимыми аргументами, устанавливая условия фильтрации и сортировки для GoodsList.
                // Выведите в консоль отфильтрованный и сортированный каталог товаров, а также значения общих суммы и количества товаров в корзине.
                if (this.sortDir === true) {
                    return a.price - b.price;
                    }
                if (this.sortDir === false) {
                    return b.price - a.price;
                    }
                }
            }

        return temporaryList.sort(sortedList.bind(GoodsList))
    }

    // добавление товара в каталог (работает)
    add(newGood) {
        this.#goods.push(newGood);
        let result = this.#goods;
        return result
    }

    // удаление товара из каталога по его id (работает)
    remove(idForDel) {

        let trigger = false

        this.#goods.forEach((good, index) => {
            if (good.id === idForDel) {;
                this.#goods.splice(index, 1);
                trigger = true
                }
            })

        let newGoods = this.#goods;

        if (trigger === true) {
            return newGoods
        } else {
            return "Товар что-то совсем не найден"
        }
    }   
    
    // Если назвать метод и свойство одинаково, вызвать метод у меня не получилось (работает)
    filterAvailable () {
        const result = this.#goods.filter(good => good.available === true)
        return result;
    }
}

// BasketGood - класс дочерний от Good, для хранения данных о товаре в корзине с дополнительным свойством:
class BasketGood extends Good {
// В конструктор данного класса в качестве параметра должен передаваться экземпляр класса Good (товар помещаемый в корзину), 
    constructor(currentGood, amount) {
// значения свойств которого должны использоваться при вызове конструктора родительского класса super().
            super(currentGood);
            // количество товара в корзине
            this.amount = amount;
            // Код товара
            this.id = currentGood.id;
            // Наименование
            this.name = currentGood.name;
            // массив возможных размеров
            this.sizes = currentGood.sizes;
            // цена товара
            this.price = currentGood.price;
            // Добавил только для метода removeUnavailable(). Можно было обойтись и искать в общем каталоге  good.available
            this.available = currentGood.available
    }
}

// Basket - класс для хранения данных о корзине товаров со свойствами:
class Basket {
    constructor() {
        // goods массив объектов класса BasketGood для хранения данных о товарах в корзине
        this.goods = [];
    }
// Реализуйте геттеры:

// get totalAmount()  возвращает общую стоимость товаров в корзине (работает)
    get totalAmount () {
        // this.removeUnavailable()
        let result = this.goods.reduce(function(totalAmount, good) {
            return totalAmount + good.amount * good.price;
          }, 0);

        return result
    }

// get totalSum()     возвращает общее количество товаров в корзине (работает)
    get totalSum () {
        // this.removeUnavailable()
        let result = this.goods.reduce(function(totalSum, good) {
            return totalSum + good.amount
          }, 0);

        return result
    }
// Реализуйте методы:
// add(good, amount) Добавляет товар в корзину, если товар уже есть увеличивает количество. (работает)
    add (good, amount) {
        // Проверка на integer
        if (!(typeof amount === "number")) {
          throw new Error("Введите количество");
        }
        // Если значение отрицательное, запускаем другой метод
        if (amount < 0) {this.remove(good, amount)

        }
        else{

        // Если нет, просто собирем массив значений по ключу
        let trigger = false
        for (let index = 0; index < this.goods.length; index++) {
            if (this.goods[index].id === good.id) {
                this.goods[index].amount = this.goods[index].amount + amount
                trigger = true
                break
            }
        }
        if (trigger === false) {

            this.goods.push(good)
            } 
        }
    }
        
// remove(good, amount) Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется (работает)
    remove (good, amount) {
      // Проверка на integer
      if (!(typeof amount === "number")) {
        throw new Error("Введите количество");
      }
      //собираю массив значений по ключу
        const idList = this.goods.map((currentGood) => currentGood.id)
        // Ищу значение в массиве
        if (idList.includes(good.id) === true) {
          
            for (let index = 0; index < this.goods.length; index++) {
            
                if (this.goods[index].id === good.id) {
                    this.goods[index].amount = this.goods[index].amount + amount;   
                    }
                if (this.goods[index].amount < 0) {
                    this.goods.splice(index, 1);
                    }
            }
          
        } 
    }
// clear() Очищает содержимое корзины (работает)
    clear() {
        this.goods.splice(0, this.goods.length)
    }
// removeUnavailable()  Удаляет из корзины товары, имеющие признак available === false (использовать filter()) (работает)
    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true)
        return this.goods;
    }

// В основном коде программы создайте не менее 5 экземпляров класса Good. Создайте экземпляры классов GoodsList и Basket. 
// Вызовите несколько раз реализованные методы этих объектов с необходимыми аргументами, устанавливая условия фильтрации и 
// сортировки для GoodsList. Выведите в консоль отфильтрованный и сортированный каталог товаров, а также значения общих суммы и количества товаров в корзине.

}


// Создание объектов
const good1 = new Good (
    1,
    "Рубашка белая мужская",
    "хлопок 100%",
    ["48", "50", "52", "54"],
    1500,
    true,
    );

const good2 = new Good (
    2,
    "Рубашка черная женская",
    "хлопок 100 %",
    ["36", "38", "40", "42", "44"],
    2100,
    true
    );

const good3 = new Good (
    3,
    "Рубашка розовая детская",
    "хлопок 100 %",
    ["28", "30", "32", "34", "36"],
    1700,
    true
    );

const good4 = new Good (
    4,
    "Джинсы мужские синие",
    "хлопок 100 %",
    ["48", "50", "52", "54"],
    3500,
    false
    );

const good5 = new Good (
    5,
    "Брюки женские черные",
    "хлопок 100 %",
    ["36", "38", "40", "42", "44"],
    4000,
    false
    );

const good6 = new Good (
    6,
    "Пиджак мужской",
    "хлопок 90 %",
    ["48", "50", "52", "54"],
    8300,
    false
    );
// Создание массива экземпляраров товаров
const goodsAll = []
    goodsAll.push(good1)
    goodsAll.push(good2)
    goodsAll.push(good3)
    goodsAll.push(good4)
    goodsAll.push(good5)

// Создание экземпляра каталога
// Создаю filter
regexp  = /(Рубашка|Пиджак)/i
const newCatalogue = new GoodsList(goodsAll, regexp, true, true)

// Создание экземпляра товара для корзины
const newBasketGood1 = new BasketGood(good1, 9)
const newBasketGood2 = new BasketGood(good2, 10)
const newBasketGood3 = new BasketGood(good3, 11)
const newBasketGood4 = new BasketGood(good4, 12)
const newBasketGood6 = new BasketGood(good6, 13)
console.log(newBasketGood1);
console.log(newBasketGood2);

// Создание экземпляра корзины (успешно)
const newBasket = new Basket()
// console.log(newBasket);


// Тестовые запуски методов товаров

// Проверка работы функции setAvailable (успешно)
// good4.setAvailable();
// console.log(good4.available);

// Проверка работы функции get list() (успешно)
// console.log(newCatalogue.list);

// Проверка работы функции add(newGood) (успешно)
// console.log(newCatalogue.add(good6));

// Проверка работы функции remove(idForDel) (успешно)
// console.log(newCatalogue.remove(undefined));

// Проверка работы функции filterAvailable () (успешно)
// console.log(newCatalogue.filterAvailable());

// Тестовые запуски методов корзины (успешно)

// Добавляем товар (успешно)
newBasket.add(newBasketGood1, newBasketGood1.amount)
// console.log(newBasket);

// Добавляем товар (успешно)
newBasket.add(newBasketGood1, 12)
// console.log(newBasket);

// Добавляем товар (успешно)
newBasket.add(newBasketGood4, 3)
// console.log("удаление товара 1");
// console.log(newBasket);

// clear() Очищает содержимое корзины (успешно)
// newBasket.clear()
// console.log(newBasket);

// removeUnavailable()  Удаляет из корзины товары available === false  (успешно)
newBasket.removeUnavailable()
console.log(newBasketGood1.amount);


// Общее количество (успешно)
console.log("Общая стоимость = " + newBasket.totalAmount);
// Общая сумма (успешно)
console.log("Общее количество = " + newBasket.totalSum);