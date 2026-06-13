## Nuvio Collections

>[!CAUTION]
>Creating collections should be considered an advanced user feature (seriously this is a warning). If you do not consider yourself an advanced user it is recommend to copy one from [nuvio's community collections](https://nuvio.tv/community-collections)

### Nuvio Collection Structures

Nuvio collections can be confusing. At its core though, it is a file system with folders and subfolders and files in those subfolders (catalogs). Below is a diagram to illustrate this.

### Nuvio Collection Folder Architecture

```mermaid
graph LR
    Root["📁 my-collection/"] --> Manifest["📄 manifest.json"]
    Root --> Assets["📁 assets/"]
    Root --> Catalogs["📁 catalogs/"]
    Root --> Config["📁 config/"]

    Assets --> Icon["🖼️ icon.png"]
    Assets --> Fanart["🖼️ background.jpg"]

    Catalogs --> Movies["📄 movies.json"]
    Catalogs --> TVShows["📄 tv_shows.json"]

    Config --> Settings["📄 settings.json"]
    Config --> Addons["📄 installed_addons.json"]

    %% Styling 
    classDef folder fill:#2d3748,stroke:#4a5568,stroke-width:2px,color:#fff
    classDef file fill:#1a202c,stroke:#4a5568,stroke-width:1px,color:#e2e8f0

    class Root,Assets,Catalogs,Config folder
    class Manifest,Icon,Fanart,Movies,TVShows,Settings,Addons file
