export class Todo {

  constructor( //date de création sera reccup par le back
              public todoName: string,
              public todoStatus: boolean= false,
              public todoDescription: string,
              public category: string,//a voir pr les relations
              public author: string,//a voir pr les relations
              public _id?: string,
              public createdAt ?:Date ,
              ){}

}
