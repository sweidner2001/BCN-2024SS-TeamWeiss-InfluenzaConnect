import instaloader


def load_instagram_profile(username):
    """
    Attempts to load an Instagram profile using the provided
    username and handling various exceptions.

    Parameters:
    username (str): Instagram username to load.

    Returns: 
    instaloader.Profile: The loaded User Profile if successful.
    str: Error message if profile can not be loaded
    """

    L = instaloader.Instaloader()

    try:
        profile = instaloader.Profile.from_username(L.context, username)

    # wrong username
    except instaloader.exceptions.ProfileNotExistsException:
        return "Error: Profile does not exist."
    # connectivity issues
    except instaloader.exceptions.ConnectionException:
        return "Error: Connection error. Please check your internet connection."
    # various errors
    except Exception as e:
        return f"Error: {e}"
    
    return profile

def get_instagram_comments(username):
    """
    Calculates the average number of comments on a post for an Instagram profile.

    Parameters: 
    username (str): The username of the influencer whose comments are to be fetched

    Returns:
    float: average number of comments per post
    """
    profile = load_instagram_profile(username)
    comments_by_posts = []
    
    # limit to 100 posts, adjust if needed
    comments_by_posts = [post.comments for post in profile.get_posts()][:100]
    
    # Error handling
    if not comments_by_posts:
        return "Error: No comments or user found or unable to fetch comments."
    
    comment_counter = sum(comments_by_posts)
    return comment_counter / len(comments_by_posts)

def get_instagram_likes(username):
    """
    Calculate the average number of likes per post for an Instagram profile.

    Parameters:
    username (str): The Instagram username whose likes are to be fetched.

    Returns:
    float: The average number of likes per post.
    str: Error message if no posts can be found or if likes cannot be fetched.
    """
    profile = load_instagram_profile(username)
    
    likes_by_post = []
    
    likes_by_post = [post.likes for post in profile.get_posts()][:100]
    
    # Error handling
    if not likes_by_post:
        return "Error: No posts found or unable to fetch likes."
    
    like_counter = sum(likes_by_post)
    return like_counter / len(likes_by_post)

def download_instagram_pic_jpg(username, amount):
    """
    Downloads an amount of the latest Instagram pictures for an Instagram profile. 

    Parameters:
    username (str): The Instagram username of the profile whose pictures you want to download.

    Returns:
    None
    """
    profile = load_instagram_profile(username)
    try:
        L = instaloader.Instaloader()
        counter = 0

        for post in profile.get_posts():
                L.download_post(post, target=profile.username)
                counter += 1
                if counter >= amount:
                    break
    except Exception as e:
        print(f"Can not download Picture: {e}")

def get_instagram_followers(username):
    """
    Retrieves the number of followers for a given Instagram username.

    Parameters:
    username (str): The Instagram username whose followers count are to be retrieved.

    Returns:
    int: The total number of followers.
    """
    profile = load_instagram_profile(username)
    return profile.followers

def engagement_rate(username):
    """
    Calculates the engagement rate for an Instagram Influencer based on likes and comments.

    Parameters:
    username (str): The Instagram username of the influencer.

    Returns:
    float: The calculated engagement rate. 

    Notes: 
    Comments are weighted more heavily than likes in this calculation, because they cost more effort.
    """
    followers = get_instagram_followers(username)
    comments = get_instagram_comments(username)
    likes = get_instagram_likes(username)

    # comments require more effort than a like
    likes_weight = 0.3
    comments_weight = 0.7

    # calculate engagement-rate
    engagement_rate = (likes * likes_weight + comments * comments_weight / followers)

    return engagement_rate

def time_since_last_post(username):
    """
    Retrieves the timestamp of the latest Instagram post on the Instagram profile.

    Parameters:
    username (str): The Instagram username whose latest post timestamp is to be retrieved.

    Returns:
    datetime.datetime: The timestamp of the latest post as datetime object.
    """
    profile = load_instagram_profile(username)

    for post in profile.get_posts():
        timestamp = post.date
        break

    return timestamp

def most_popular_posts(username):
    pass

def get_instagram_profile_pic(username):
    """
    Download the profile picture of a specified Instagram user.

    Parameters:
    username (str): The Instagram username of the profile whose profile picture you want to download.

    Returns:
    None
    """
    L = instaloader.Instaloader()
    L.download_profile(username, profile_pic_only=True)