import { useContentsStore } from '../../../views/restaurants/stores/ContentsStore'

export class Base {
  constructor() {
    this.contentsStore = useContentsStore()
  }

  setCancelContent(content) {
    this.contentsStore.setContent(content)
  }

  cancel() {
    
  }
}