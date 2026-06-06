package com.example.androidtvservice.presentations.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidtvservice.R;
import com.example.androidtvservice.domains.models.News;

import java.util.ArrayList;

public class NewsAdapter extends RecyclerView.Adapter<NewsAdapter.ViewHolder> {
    Context context;
    ArrayList<News> newsList;
    public NewsAdapter(Context context,ArrayList<News> news){
        this.newsList = news;
        this.context = context;
    }
    @NonNull
    @Override
    public NewsAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_news,parent,false);
        return new ViewHolder(view);
    }
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        News news = newsList.get(position);
        holder.nameTV.setText(news.name);
        holder.descriptionTV.setText(news.description);
        holder.dateTV.setText(news.date);
    }
    @Override
    public int getItemCount() {
        return newsList.size();
    }
    public class ViewHolder extends RecyclerView.ViewHolder{
        TextView nameTV,descriptionTV,dateTV;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTV = itemView.findViewById(R.id.nameTV);
            descriptionTV = itemView.findViewById(R.id.descriptionTV);
            dateTV = itemView.findViewById(R.id.dateTV);
        }
    }
}
