## Nuvio Collections

>[!CAUTION]
>Creating collections should be considered an advanced user feature (seriously this is a warning). If you do not consider yourself an advanced user it is recommend to copy one from [nuvio's community collections](https://nuvio.tv/community-collections)

### Nuvio Collection Structures

Nuvio collections can be confusing. At its core though, it is a file system with folders and subfolders and files in those subfolders (catalogs). Below is a diagram to illustrate this.

### Nuvio Collection Structures

```mermaid
graph TD
    %% Collection 1: Mainline Cinema & TV
    subgraph Collection_1 [🎬 Collection 1: Mainline Cinema & TV]
        C1Root[Main Interface] --> TMDB[TMDB Add-on]
        C1Root --> Trakt[Trakt Integration]
        
        TMDB --> TMDBMovies[Trending Movies]
        TMDB --> TMDBShows[Popular TV Shows]
        
        Trakt --> TraktWatchlist[Personal Watchlist]
        Trakt --> TraktRecs[Trakt Recommendations]
        
        TMDBMovies -.-> Source1[Debrid / Provider Links]
        TMDBShows -.-> Source1
        TraktWatchlist -.-> Source1
    end

    %% Collection 2: Dedicated Anime Build
    subgraph Collection_2 [⚔️ Collection 2: Dedicated Anime Build]
        C2Root[Custom Interface] --> Kitsu[Kitsu Add-on]
        C2Root --> AIO[AIO Metadata Add-on]
        
        Kitsu --> KitsuTrending[Trending Anime]
        Kitsu --> KitsuAiring[Currently Airing]
        
        AIO --> AIOShounen[Custom Shounen Catalog]
        AIO --> AIOMovies[Anime Feature Films]
        
        KitsuTrending -.-> Source2[Debrid / Nyaa Links]
        KitsuAiring -.-> Source2
        AIOShounen -.-> Source2
    end
    
    %% Styling
    classDef main fill:#2a2a2a,stroke:#333,stroke-width:2px,color:#fff
    classDef addon fill:#005f73,stroke:#001219,stroke-width:2px,color:#fff
    classDef category fill:#0a9396,stroke:#001219,stroke-width:2px,color:#fff
    classDef source fill:#9b2226,stroke:#370617,stroke-width:2px,color:#fff

    class C1Root,C2Root main
    class TMDB,Trakt,Kitsu,AIO addon
    class TMDBMovies,TMDBShows,TraktWatchlist,TraktRecs,KitsuTrending,KitsuAiring,AIOShounen,AIOMovies category
    class Source1,Source2 source
