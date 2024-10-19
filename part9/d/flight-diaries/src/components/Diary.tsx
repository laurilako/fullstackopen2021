import React from 'react';
import { Diary } from '../types';

interface DiaryProps {
    diary: Diary;
}

const DiaryComponent: React.FC<DiaryProps> = ({ diary }) => {
    return (
        <div>
            <h2>{diary.date}</h2>
            <p>Visibility: {diary.visibility} <br>
            </br> Weather: {diary.weather}</p>
            <p>Comment: {diary.comment}</p>
        </div>
    );
};

export default DiaryComponent;