Based on the console logs that I've added to each card (mount/unmount) it looks like cards up the stack don't unmount when you go deeper in the stack -- i.e. the challenges_list card is still mounted even when you click on a challenge card. Perhaps I can use this to my advantage when setting the Firebase DB listener(s).

I'm still not sure if I should implement Redux
Should read this: https://reactnavigation.org/docs/guides/redux
