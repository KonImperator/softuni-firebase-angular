import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeUri',
})

export class EncodeUriPipe implements PipeTransform {
  transform(value: string): string {
    return encodeURIComponent(value);
  }
}
