# Emojinary Friend

This is the repo for (the now defunct) Emoji Salad.

Emoji Salad was an SMS-based game of Emoji Pictionary developed by SIBlings in 2015. It made enemies out of friends and friends out of enemies.

A game would go something like this:

```
BOT (to all)
👾 You'll start us off, 🦁Ari! Your phrase is: THE LEGEND OF ZELDA

Reply using emojis only. Your goal is to get the other players to guess your phrase. Text OPTIONS if you get stuck, and PASS if you give up. (PASS will cost you 1 point).

//////////

ARI
🎮👸⚔️🛡

//////////

BOT (only to Ari)
👾 Gosh, those are great! Let's get started.

BOT (to group)
🦁Ari's clue: 🎮👸⚔️🛡

Text OPTIONS if you get stuck, and don't forget to ask for a CLUE if you get stuck!

//////////

KEVIN
Legend of Zelda

//////////

BOT (to all)
👾 YAY ⚾️ Kevin got it RIGHT! The phrase was THE LEGEND OF ZELDA

👾 It's your turn, ⚾️ Kevin...

```
<a href="https://www.youtube.com/watch?v=9U7IJpVog4A" target="_blank"><img alt="Image of Emoji Salad being played" title="Image of Emoji Salad being played" src="https://img.youtube.com/vi/9U7IJpVog4A/0.jpg" /></a>

## Why can't I play this game?

Emoji Salad had a good run, it got us through some tough times, but part of growing up is knowing when to pull the plug.

If you'd like us to set you up a private game, send one of us an email and we'll try and set you up. You might have to buy us a beer for your troubles though :)

## What did you learn?

A lot! You can read Ari's rundown of our design process here:

[Designing a Chatbot's Personality](https://chatbotsmagazine.com/designing-a-chatbots-personality-52dcf1f4df7d)

You can read Kevin's write up of chatbot heuristics we came up with:

[Usability Heuristics for Bots](https://thekevinscott.com/usability-heuristics-for-bots/)

Here's a couple more articles to whet your whistle:

* [Emojis in Javascript](https://thekevinscott.com/emojis-in-javascript/)
* [Popular Use Cases for Chatbots](https://thekevinscott.com/popular-use-cases-for-chatbots/)
* [Testing Chatbots: How to Ensure a Bot Says the Right Thing at the Right Time](https://thekevinscott.com/testing-chatbots-how-to-ensure-a-bot-says-the-right-thing-at-the-right-time/)
* [We moved to a services-based architecture while building our Bot and it is awesome](https://thekevinscott.com/we-moved-to-a-services-based-architecture-while-building-our-bot-and-it-is-awesome/)
* [Cross Platform Bots](https://thekevinscott.com/cross-platform-bots/)

Don't like to read? Neither did our users! (just kidding). But here's a video presentation about Emoji Salad:

<a href="https://www.youtube.com/watch?v=IamU08l-btM&t=2427" target="_blank"><img alt="Talking about Emoji Salad at a meetup" title="Talking about Emoji Salad at a meetup" src="https://img.youtube.com/vi/IamU08l-btM/0.jpg" /></a>

## Technical Details

The backend of Emoji Salad was Node.js and made extensive use of microserves. For the app version, we used React Native.

Emoji Salad was capable of being played over a number of channels, including Twilio, Nexmo, email, Facebook Messenger, and an app, but we focused most of our attention on making the SMS experience the primary channel.

## Creators

Emoji Salad was created by [Michelle Lew](http://michellelew.com), Ari Zilnik, and [Kevin Scott](https://thekevinscott.com) as part of SIBlings, a design collective founded in Brooklyn in 2014. SIBlings takes on cutting edge design problems and tries to solve them.

<a href="https://twitter.com/BrownInstitute"><img alt="Emojicon" title="Emojicon" src="https://github.com/thekevinscott/emojisalad/blob/master/emojicon.jpg?raw=true" /></a>
