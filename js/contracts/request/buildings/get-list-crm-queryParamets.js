class getListBuildingsQueryParametrs{
    constructor({token, per_page, page, complex_id, search}){
        if(token == null) 

        //Обязательные параметры
        this.token = token; 


        //Необязательные параметры
        this.per_page = per_page; //Количество объектов на страницу
        this.page = page; //номер страницы
        this.complex_id = complex_id //Поиск комплекса по Id
        this.search = search// Поиск по адресу

    }
}