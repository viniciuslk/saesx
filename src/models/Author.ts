interface Author {
  id: string
  name: string
  email: string
  image: string | null
  externalId: string | null
  createdAt: Date
  following: Array<Author>
  followedBy: Array<Author>
}