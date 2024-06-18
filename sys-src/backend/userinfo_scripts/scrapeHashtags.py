import instaloader
import re
from dotenv import load_dotenv
import os
from openai import OpenAI


# Scraping Users Instagram-Posts for Hashtags
# Input: Instagram-Username
# Output: Array of Hashtags

def get_instagram_hashtags(username):
    L = instaloader.Instaloader()
    
    # Load Instagram-Profile
    profile = instaloader.Profile.from_username(L.context, username)
    
    hashtags = []

    # Scraping posts for hashtags (100 posts, change if needed)
    for post in profile.get_posts():
        caption = post.caption
        post_hashtags = re.findall(r'#\w+', caption)
        hashtags.extend(post_hashtags)

        # limit to 100 posts
        if len(hashtags) >= 100:  
            break

    return hashtags


def get_instagram_comments(username):
    L = instaloader.Instaloader()

    profile = instaloader.Profile.from_username(L.context, "alexa_breit")
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

# Categorization of scraped hashtags to a specific genre
# Input: Hashtags
# Output: Categories (atm. 4, might be adjusted)
def hashtagGPT(hashtags):

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
                "content": f"Du sollst dir die folgenden Hashtags ansehen und anhand derer entscheiden, \
                in welche der Sparten der Post eines Influencers am besten passt. Gib mir nur die Sparten zurück, \
                die sich eindeutig zuordnen lassen, und wähle auch nur die Sparten, die ich dir angegeben habe. \
                Achte darauf, dass die Mehrheit der Hashtags in deine ausgewählte Sparte passt und lass lieber \
                eine Sparte weg, wenn nur wenige Hashtags darauf zutreffen. Du musst nicht unbedingt 5 auswählen. \
                Wichtiger ist, dass du sicher bist, dass die Mehrheit der Hashtags in die Sparte passen. \
                Zuzuordnende Hashtags: {', '.join(list(hashtags))} \
                Verfügbare Sparten: \
                Mode und Kleidung, Schmuck und Accessoires, Kosmetik und Beauty, Gesundheit und Fitness, Essen und Trinken, \
                Reisen und Abenteuer, Technologie und Gadgets, Spiele und E-Sports, Familie und Kinder, Haustiere und Tierpflege, \
                Heim und Garten, Autos und Motorräder, Bücher und Literatur, Musik und Konzerte, Filme und Serien, \
                Kunst und Kultur, Fotografie und Videografie, Finanzen und Investitionen, Bildung und Lernen, \
                Business und Unternehmertum, Nachhaltigkeit und Umweltschutz, Mode für Plus-Size, DIY und Handwerk, \
                Outdoor und Abenteuer, Wellness und Selbstpflege, Politik und Gesellschaft, Humor und Unterhaltung, \
                Spirituelles und Esoterik, Immobilien und Architektur, Event- und Partymanagement. \
                Hauptaufgabe: \
                Gib mir eine Zeichenkette zurück, die maximal 5 der folgenden Sparten durch Komma getrennt enthält. \
                Gib mir ausschließlich diese Sparten mit Komma getrennt zurück und sonst keinen weiteren Text."
            }
        ],
        model="gpt-3.5-turbo"
    )

    # Reduce GPT-Response to Content (only need Chat Response)
    return chat_completion.choices[0].message.content


# hashtags = get_instagram_hashtags("alexa_breit")
# subject = hashtagGPT(hashtags)

# print(subject)

# print(get_instagram_comments("alexa_breit"))