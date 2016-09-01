// Using RuntimeCompiler to compile a component on the fly

import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ComponentFactory,
  NgModuleFactory,
  Input,
  OnDestroy
} from '@angular/core'
import { RuntimeCompiler } from '@angular/compiler'

import { getCleanHtmlTextFromMarkdown } from './markdown.service'
import { MarkdownViewerModule } from './markdown-viewer.module'
import { MarkdownComponentService } from './structure-components/markdown-component.service'

@Component({
  selector: 'markdown-viewer',
  template: `<div #dynamicComponentPlaceholder></div>`
})
export class MarkdownViewerComponent implements AfterViewInit, OnDestroy {
  @Input() markdown: string;
  @Input() template: string;
  @Input() styles: string[];

  @ViewChild('dynamicComponentPlaceholder', { read: ViewContainerRef })
  public dynamicComponentTarget: ViewContainerRef;

  public componentRef: ComponentRef<any>;

  constructor (
    private runtimeCompiler: RuntimeCompiler,
    private markdownComponentService: MarkdownComponentService
  ) {}

  public ngAfterViewInit () {
    if (this.template) {
      this.renderContent(this.template, this.styles)
    } else if (this.markdown) {
      let htmlFromMarkdown = getCleanHtmlTextFromMarkdown(this.markdown)
      this.renderContent(htmlFromMarkdown, this.styles)
    }
  }

  public ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy()
      this.componentRef = null
    }
  }

  public renderContent (template, styles) {
    let builtComponent = this.markdownComponentService.buildComponent({
      template,
      styles
    })
    // component and module to attach it to
    this.runtimeCompiler
      .compileModuleAsync(builtComponent)
        .then((ngModuleFactory: NgModuleFactory<any>) => {
          console.log("ALERT! This stuff doesn't work. It isn't even documented yet.")
          console.log(ngModuleFactory)
        })
      // http://stackoverflow.com/questions/34784778/equivalent-of-compile-in-angular-2

      // This stuff worked with RC5. RC6 only works with NgModule

      // .compileComponentAsync(builtComponent, MarkdownViewerModule)
      // .then((factory: ComponentFactory<any>) => {
      //   this.componentRef = this.dynamicComponentTarget.createComponent(factory, 0)

      //   // a reference to the newly compiled component instance
      //   let componentInstance = this.componentRef.instance
      // })
  }
}
