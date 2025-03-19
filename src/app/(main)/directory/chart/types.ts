export interface Person {
    id: string
    name: string
    title: string
    imageUrl?: string
    isGroup?: boolean
    children?: Person[]
  }  