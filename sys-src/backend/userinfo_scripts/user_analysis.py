import instaloader

# Scrape average number of comments on a post
def get_instagram_comments(username):
    L = instaloader.Instaloader()

    profile = instaloader.Profile.from_username(L.context, username)
    comments_by_posts = []

    for post in profile.get_posts():
        comments_by_posts.append(post.comments)
        # Limit to 100 posts, adjust if needed
        if len(comments_by_posts) >= 100:
            break
    
    # Calculate total sum of comments
    comment_counter = 0
    for comments in comments_by_posts:
        comment_counter += comments

    # Return mean comments
    return comment_counter / len(comments_by_posts)


# Scrape average number of likes on a post
def get_instagram_likes(username):
    L = instaloader.Instaloader()

    profile = instaloader.Profile.from_username(L.context, username)
    likes_by_post = []

    for post in profile.get_posts():
        likes_by_post.append(post.likes)
        # limit to 100 posts, adjust if needed
        if len(likes_by_post) >= 100:
            break
    
    # Calculate total sum of likes
    like_counter = 0
    for likes in likes_by_post:
        like_counter += likes

    # Return average likes
    return like_counter / len(likes_by_post)

#print(get_instagram_comments("bellapoarch"))
#print(get_instagram_likes("bellapoarch"))


# Download an Amount of Instagram-Pictures

def download_instagram_pictures_jpg(username, amount):
    L = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(L.context, username)

    counter = 0
    for post in profile.get_posts():
        try:
            L.download_post(post, target=profile.username)
            counter += 1
            if counter >= amount:
                break
        except Exception as e:
            print(f"Fehler beim Herunterladen des Beitrags: {e}")

# Scraping number of followers
def get_instagram_followers(username):
    L = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(L.context, username)

    return profile.followers


def engagement_rate(username):
    L = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(L.context, username)

    followers = get_instagram_followers(username)
    comments = get_instagram_comments(username)
    likes = get_instagram_likes(username)

    likes_weight = 0.7
    comments_weight = 0.3

    # Calculate Engagement-Rate
    return (likes * likes_weight + comments * comments_weight / followers)

def time_since_last_post(username):
    L = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(L.context, username)

    for post in profile.get_posts():
        timestamp = post.date
        break

    return timestamp

def most_popular_posts(username):
    pass


# username = "addisonraee"
# L = instaloader.Instaloader()
# profile = instaloader.Profile.from_username(L.context, username)


#print(last_user_interaction(username))