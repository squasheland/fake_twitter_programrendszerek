db.users.createIndex(
  { username: 1 },
  { unique: true }
)
db.users.createIndex(
  { email: 1 },
  { unique: true }
)



db.tweets.createIndex(
  { authorId: 1 }
)
db.tweets.createIndex(
  { createdAt: -1 }
)



db.comments.createIndex(
  { tweetId: 1 }
)
db.comments.createIndex(
  { authorId: 1 }
)



db.likes.createIndex(
  { userId: 1, tweetId: 1 },
  { unique: true }
)



db.retweets.createIndex(
  { userId: 1, tweetId: 1 },
  { unique: true }
)



db.reports.createIndex(
  { tweetId: 1 }
)
db.reports.createIndex(
  { status: 1 }
)