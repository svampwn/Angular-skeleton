import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BaseService } from './services/base.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap, debounceTime } from 'rxjs/operators';
export interface SidebarExpanded{
    menu:boolean,
    footer:boolean,
    help:boolean,
}
@Injectable()
export class AppService extends BaseService {
    private expandedSource: BehaviorSubject<SidebarExpanded> = new BehaviorSubject<SidebarExpanded>({menu:true,footer:true,help:false});
    public expanded$ = this.expandedSource.asObservable().pipe(distinctUntilChanged(this.compareExpand));
    //debounce or event when the menus have finished expand/minimize in the dom
    public menus$ = this.expanded$.pipe(debounceTime(100),distinctUntilChanged((prev,current)=>{return prev.help ===current.help && prev.menu ===current.menu  }))
    constructor(protected http: HttpClient) {
        super(http, 'api/');
    }
    private compareExpand(a:SidebarExpanded,b:SidebarExpanded):boolean{
        return a.menu === b.menu && a.footer===b.footer && a.help===b.help
    }
    emitMenu(expanded:boolean){
        this.emitExpand("menu",expanded)
    }
    emitHelp(expanded:boolean){
        this.emitExpand("help",expanded)
    }
    emitFooter(expanded:boolean){
        this.emitExpand("footer",expanded)
    }
    emitFullscreen(fullscreen:boolean){
        if(fullscreen){
            this.emitState({footer:false,help:false,menu:false})
        }
        else{
            this.emitState({footer:false,help:false,menu:true})
        }
    }
    private emitExpand(key:string,expanded:boolean){
        const currentState =this.expandedSource.getValue()
        const temp =Object.assign({},currentState)
        temp[key] = expanded
        this.expandedSource.next(temp)
    }
    private emitState(newState:SidebarExpanded){
        const currentState =this.expandedSource.getValue()
        const temp =Object.assign({},currentState)
        Object.assign(temp,newState)
        this.expandedSource.next(temp)
    }
    toggleFooter(){
        this.toggle("footer")
    }
    toggleMenu(){
        this.toggle("menu")
    }
    toggleHelp(){
        this.toggle("help")
    }
    private toggle(key:string){
        const currentState =this.expandedSource.getValue()
        const temp =Object.assign({},currentState)
        temp[key] = !temp[key]
        this.expandedSource.next(temp)
    }
    
}
