import instaloader

# Scrape average number of comments on a post
def get_instagram_comments(username):
    L = instaloader.Instaloader()

    try:
        profile = instaloader.Profile.from_username(L.context, username)

    # wrong username
    except instaloader.exceptions.ProfileNotExistsException:
        return "Error: Profile does not exist."
    # connectivity issues
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error. Please check your internet connection."
    # different errors
    except Exception as e:
        return f"Error: {e}"
    
    comments_by_posts = []

    try:
        # Limit to 100 posts, adjust if needed
        comments_by_posts = [post.comments for post in profile.get_posts()][:100]
    
    # connectivity issues
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error while fetching posts. Please try again."
    # different errors
    except Exception as e:
        return f"Error: {e}"
    
    if not comments_by_posts:
        return "Error: No posts or user found or unable to fetch comments."
    
    comment_counter = sum(comments_by_posts)
    return comment_counter / len(comments_by_posts)


# Scrape average number of likes on a post
def get_instagram_likes(username):
    L = instaloader.Instaloader()
    
    try:
        profile = instaloader.Profile.from_username(L.context, username)

    # wrong username
    except instaloader.exceptions.ProfileNotExistsException:
        return "Error: Profile does not exist."
    # connectivity issues
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error. Please check your internet connection."
    # different errors
    except Exception as e:
        return f"Error: {e}"
    
    likes_by_post = []
    
    try:
        likes_by_post = [post.likes for post in profile.get_posts()][:100]
    # connectivity issues
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error while fetching posts. Please try again."
    except Exception as e:
        return f"Error: {e}"
    
    if not likes_by_post:
        return "Error: No posts found or unable to fetch likes."
    
    like_counter = sum(likes_by_post)
    return like_counter / len(likes_by_post)

# Download an Amount of Instagram-Pictures
def download_instagram_pictures_jpg(username, amount):
    L = instaloader.Instaloader()
    try:
        profile = instaloader.Profile.from_username(L.context, username)
    except instaloader.exceptions.ProfileNotExistsException:
        return "Error: Profile does not exist."
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error. Please check your internet connection."
    except Exception as e:
        return f"Error: {e}"

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
    
    try:
        profile = instaloader.Profile.from_username(L.context, username)
    except instaloader.exceptions.ProfileNotExistsException:
        return "Error: Profile does not exist."
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error. Please check your internet connection."
    except Exception as e:
        return f"Error: {e}"

    return profile.followers


def engagement_rate(username):
    L = instaloader.Instaloader()
    
    try:
        profile = instaloader.Profile.from_username(L.context, username)
    except instaloader.exceptions.ProfileNotExistsException:
        return "Error: Profile does not exist."
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error. Please check your internet connection."
    except Exception as e:
        return f"Error: {e}"

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


print(get_instagram_comments("celina"))