import instaloader
import re
import pandas as pd

# Scraping Users Instagram-Posts for Hashtags
# Input: Instagram-Username
# Output: Array of Hashtags
""""
def get_instagram_hashtags(username):
    L = instaloader.Instaloader()
    
    # Load Instagram-Profile
    profile = instaloader.Profile.from_username(L.context, username)
    
    hashtags = []

    # Scraping posts for hashtags (100 posts, change if needed)
    for post in profile.get_posts():
        caption = post.caption
        if caption:
            post_hashtags = re.findall(r'#\w+', caption)
            hashtags.extend(post_hashtags)
        
        if len(hashtags) >= 100:  # limit to 100 posts
            break

    return hashtags

print(get_instagram_hashtags("alexa_breit"))
"""

from dotenv import load_dotenv
import os
from openai import OpenAI

# Load .env (Configuration of OpenAI-Api-Key)
load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')

# Configure API-Key
client = OpenAI(
    api_key=openai_api_key
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "you are weird"
        }
    ],
    model="gpt-3.5-turbo"
)

print(chat_completion)