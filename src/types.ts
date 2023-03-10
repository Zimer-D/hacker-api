export type StoryType = {
    by: string,
descendants: number,
id: number,
score: number,
time: number,
title: string,
type: string,
url: string,
kids: number[]
}

export type CommentType = {
by: string,
id: number,
parent: number,
text: string,
time: number,
type: string,
kids: number[],
children: CommentType[]
}