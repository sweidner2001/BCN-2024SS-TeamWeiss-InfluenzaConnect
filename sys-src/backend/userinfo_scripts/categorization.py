from user_analysis import load_instagram_profile
import re
from dotenv import load_dotenv
import os
from openai import OpenAI



def get_instagram_hashtags(username):
    """
    Scrapes Instagram posts for hashtags associated with a given username.

    Parameters:
    username (str): The Instagram username whose posts' hashtags are to be scraped.

    Returns:
    list: A list of hashtags (strings) found in captions of the user's Instagram posts.

    Notes:
    Only the 100 latest posts' captions are scraped for hashtags.
    """
    profile = load_instagram_profile
    
    hashtags = []

    # Scraping posts for hashtags (100 posts, change if needed)
    for post in profile.get_posts():
        if post.caption:
            caption = post.caption
            post_hashtags = re.findall(r'#\w+', caption)
            if len(post_hashtags) > 0:
                hashtags.extend(post_hashtags)

        # limit to 100 posts
        if len(hashtags) >= 100:  
            break

    return hashtags


def hashtagGPT(hashtags):
    """
    Categorizes a list of hashtags into specific genres using OpenAI's GPT-3.5-turbo models.

    Parameters:
    hashtags (list): A list of hashtags (strings) scraped from Instagram posts

    Returns: 
    list:   A list containing two categories (strings) that best match the hashtags according to GPT.

    Notes:
    The primary category is listed first.
    """
    # Load .env (OpenAI-Api-Key)
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
                Gib mir eine Zeichenkette zurück, die eine primäre und eine sekundäre der folgenden Sparten durch Komma getrennt enthält. \
                Gib mir ausschließlich diese Sparten mit Komma getrennt zurück und sonst keinen weiteren Text.
                Nenne die primäre Sparte zuerst und als zweites die sekundäre Sparte."
            }
        ],
        model="gpt-3.5-turbo"
    )

    # Extract the primary and secondary category
    category = chat_completion.choices[0].message.content.split(", ")
    return category
    

# ### EXAMPLE ###
# hashtags = get_instagram_hashtags("therealmoneyboy")
# subject = hashtagGPT(hashtags)
# print(subject)

# print(get_instagram_comments("alexa_breit"))