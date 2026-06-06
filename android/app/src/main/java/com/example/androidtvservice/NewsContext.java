package com.example.androidtvservice;

import com.example.androidtvservice.domains.models.News;

import java.util.ArrayList;

public class NewsContext {
    public static ArrayList<News> allNews(){
        ArrayList<News> news = new ArrayList<News>();
        news.add(new News(1,"Первая","Описание новости 1qwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr1214214214b124","01-02-2026 12:12:12"));
        news.add(new News(2,"Вторая","Новость новость новость новость новость новость новость новость", "01-03-2026 12:12:12"));
        news.add(new News(3,"Третья","Описание новости 3", "01-04-2026 12:12:12"));
        news.add(new News(4,"Четвертая","Описание новости 4", "01-05-2026 12:12:12"));
        news.add(new News(5,"Пятая","Описание новости 5", "01-06-2026 12:12:12"));
        return news;
    }
}
