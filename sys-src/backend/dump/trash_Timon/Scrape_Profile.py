# Importiere notwendige Bibliotheken und Module
import instaloader
from IPython.display import display, Image
import json


def process(param):
    
   
    L = instaloader.Instaloader()

    # Laden des Instagram-Profils
    profile = instaloader.Profile.from_username(L.context, param)

    # Profilbild-URL
    profile_pic_url = profile.profile_pic_url
    

    # Profilbeschreibung (Bio)
    profile_bio = profile.biography
    

    # Letzte drei Posts
    posts_url = []
    posts_captions = []
    for post in profile.get_posts():
        if len(posts_url) < 3:
            posts_url.append(post.url)
            posts_captions.append(post.caption)
        else:
            break
    
     
   
    return  {
             "Name": param,
             "profile_pic_url": profile_pic_url,
             "profile_bio" : profile_bio,
             "posts_url": posts_url,
             "posts_caption": posts_captions
            }


def getName(param):
   name = process(param)['Name']
   return name

def getProfilepicture(param):
     profilepicture = process(param)['profile_pic_url']
     return profilepicture


def getProfilebio(param):
     profilebio = process(param)['profile_bio']
     return profilebio

def getPostsurl(param, n):
    profileurl = process(param)['posts_url'][n]
    return profileurl

def getPostsurl(param, n):
    postscaption = process(param)['posts_caption'][n]
    return postscaption







