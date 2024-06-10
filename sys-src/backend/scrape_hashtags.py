import instaloader
import re

def get_instagram_hashtags(username):
    L = instaloader.Instaloader()
    
    # Laden des Instagram-Profils
    profile = instaloader.Profile.from_username(L.context, username)
    
    hashtags = []

    # Durchsuchen der letzten Posts (10 st., nach Bedarf abändern)
    for post in profile.get_posts():
        caption = post.caption
        if caption:
            post_hashtags = re.findall(r'#\w+', caption)
            hashtags.extend(post_hashtags)
        
        if len(hashtags) >= 10:  # Limit auf 10 Posts
            break

    return hashtags