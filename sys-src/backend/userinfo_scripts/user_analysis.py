import instaloader


def get_instagram_comments(username):
    L = instaloader.Instaloader()

    profile = instaloader.Profile.from_username(L.context, username)
    comments_by_posts = []

    for post in profile.get_posts():
        comments_by_posts.append(post.comments)
        # limit to 100 posts, adjust if needed
        if len(comments_by_posts) >= 100:
            break
    
    # Calculate total sum of comments
    comment_counter = 0
    for comments in comments_by_posts:
        comment_counter += comments

    # Return mean comments
    return comment_counter / len(comments_by_posts)


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

