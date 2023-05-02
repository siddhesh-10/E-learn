import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { Interactions } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-chat-bot',
  templateUrl: './my-chat-bot.component.html',
  styleUrls: ['./my-chat-bot.component.css']
})
export class MyChatBotComponent implements OnInit {
  conversation: string = '';
  message: string = '';
  close:boolean = false;
  messages: { content: string, sentByUser: boolean }[] = [];
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  onClose(){
    this.close=true;
  }
  async startChat() {
    // Provide a bot name and user input
    //this.conversation = this.conversation + "\n\nYou:" + this.message;
    this.messages.push({ content: 'You: ' + this.message, sentByUser: true });
    var response = await Interactions.send("E-Learn", this.message.toString());
    const {messages} = response
    //Log chatbot response
    console.log(JSON.stringify(response));
    this.message = '';
    if(response){
      this.messages.push({ content: 'Bot: ' + messages[0].content, sentByUser: false });
      //this.conversation = this.conversation +'<p class="user">'+"\nBot::" + messages[0].content+'</P>';
    }
    
  }

}
