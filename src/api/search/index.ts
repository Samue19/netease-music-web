import { getRequest } from "../request";
import { SearchType } from "@/utils/constant";
import type { ISong, IPlaylist, IMultiPageConfig } from "@/types";
import type { AxiosResponse } from "axios";

enum REQUEST_URL {
  Search = "/search",
  SearchHot = "/search/hot",
}

export interface ISearchParams extends IMultiPageConfig {
  keywords: string;
  type: SearchType;
}

// 获取资源搜索
export const getSearch = (params: ISearchParams) => {
  return getRequest(REQUEST_URL.Search, params).then( 
    (res: AxiosResponse) => {
      const { result } = res.data;
      console.log(result);

      if (params.type === SearchType.single) {
        const songs: ISong[] = result.songs.map((song: any, index: number) => {
          return {
            id: song.id,
            name: song.name,
            order: index + 1,
            picUrl: song.picUrl,
            artists: song.artists.map((ar: any) => ar.name).join("/"),
            album: song.album.name,
            duration: song.duration,
          };
        });
        return {
          songs,
          total: result.songCount,
        };
      } else if (params.type === SearchType.playlist) {
        const playlists: IPlaylist[] = result.playlists.map(
          (playlist: any, index: number) => {
            return {
              id: playlist.id,
              name: playlist.name,
              order: index + 1,
              picUrl: playlist.coverImgUrl,
              playCount: playlist.playCount,
            };
          }
        );
        return {
          playlists,
          total: result.playlistCount,
        };
      }
    }
  );
};

// 获取热搜简略列表
export const getSearchHot = () => {
  return getRequest(REQUEST_URL.SearchHot).then(
    (res: AxiosResponse): string[] => {
      return res.data.result.hots.map((hot: any) => hot.first);
    }
  );
};
