package com.example.androidtvservice.domains.models;

public class News {
    public Integer id;
    public String name;
    public String description;
    public String date;
    public News(int id, String name, String descripiton, String date){
        this.id = id;
        this.name = name;
        this.description = descripiton;
        this.date = date;
    }
}
