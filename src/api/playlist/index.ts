import { getRequest } from "../request";
import type { IMultiPageConfig, IMultiPageBeforeConfig } from "@/types";
import type { AxiosResponse } from "axios";
import type { IPlaylist, ISong, IPlaylistDetail } from "@/types";

enum REQUEST_URL {
  PersonalizedPlaylist = "/personalized",
  PersonalizedNewsong = "personalized/newsong",
  TopPlaylist = "/top/playlist",
  TopPlaylistHighquality = "/top/playlist/highquality",
  TopSong = "top/song",
  PlaylistDetail = "/playlist/detail",
  SongDetail = "/song/detail",
}

// 推荐歌单
export const getPersonalizedPlaylist = (params?: { limit?: number }) => {
  return getRequest(REQUEST_URL.PersonalizedPlaylist, params).then(
    (res: AxiosResponse): IPlaylist[] => {
      const { result } = res.data;

      return result.map((playlist: any, index: number) => {
        return {
          id: playlist.id,
          name: playlist.name,
          order: index + 1,
          picUrl: playlist.picUrl,
          playCount: playlist.playCount,
          copywriter: playlist.copywriter,
        };
      });
    }
  );
};

// 推荐新音乐
export const getPersonalizedNewsong = (params?: { limit?: number }) => {
  return getRequest(REQUEST_URL.PersonalizedNewsong, params).then(
    (res: AxiosResponse): ISong[] => {
      const { result } = res.data;

      return result.map((song: any, index: number) => {
        return {
          id: song.id,
          name: song.name,
          order: index + 1,
          picUrl: song.picUrl,
          artists: song.song.artists.map((ar: any) => ar.name).join("/"),
          album: song.song.album.name,
          duration: song.song.duration,
        };
      });
    }
  );
};

// 网友精选碟歌单
export const getTopPlaylist = (
  params?: { order?: string; cat?: string | number } & IMultiPageConfig
) => {
  return getRequest(REQUEST_URL.TopPlaylist, params).then(
    (res: AxiosResponse) => {
      const { playlists, total, more } = res.data;

      const transPlaylists: IPlaylist[] = playlists.map(
        (playlist: any, index: number) => {
          return {
            id: playlist.id,
            name: playlist.name,
            order: index + 1,
            picUrl: playlist.coverImgUrl,
            playCount: playlist.playCount,
            description: playlist.description,
          };
        }
      );

      return {
        total: total as number,
        more: more as boolean,
        playlists: transPlaylists,
      };
    }
  );
};

// 推荐中的精品歌单
export const getTopPlaylistHighquality = (
  params?: { cat?: string } & IMultiPageBeforeConfig
) => {
  return getRequest(REQUEST_URL.TopPlaylistHighquality, params).then(
    (res: AxiosResponse) => {
      const { playlists, total, more } = res.data;

      const transPlaylists: IPlaylist[] = playlists.map(
        (playlist: any, index: number) => {
          return {
            id: playlist.id,
            name: playlist.name,
            order: index + 1,
            picUrl: playlist.coverImgUrl,
            playCount: playlist.playCount,
            description: playlist.description,
          };
        }
      );

      return {
        total: total as number,
        more: more as boolean,
        playlists: transPlaylists,
      };
    }
  );
};

//新歌速递
export const getTopSong = (params: { type: string | number }) => {
  return getRequest(REQUEST_URL.TopSong, params).then(
    (res: AxiosResponse): ISong[] => {
      const { data } = res.data;

      return data.map((song: any, index: number) => {
        return {
          id: song.id,
          name: song.name,
          order: index + 1,
          picUrl: song.album.picUrl,
          artists: song.artists.map((ar: any) => ar.name).join("/"),
          album: song.album.name,
          duration: song.duration,
        };
      });
    }
  );
};

// 歌单详情
export const getPlaylistDetail = (params: { id: string; s?: string }) => {
  return getRequest(REQUEST_URL.PlaylistDetail, params).then(
    async (res: AxiosResponse): Promise<IPlaylistDetail> => {
      const { playlist } = res.data;
      const { tags, creator, trackIds } = playlist;
      const ids = trackIds.map((track: any) => track.id).join(",");

      /**
       * 先请求歌单获取歌单下所有的 trackIds，再请求歌曲详情。
       * https://neteasecloudmusicapi.vercel.app/#/?id=获取歌单详情
       */
      const { data } = await getSongDetail({ ids });
      const transSongs: ISong[] = data.songs.map((song: any, index: number) => {
        return {
          id: song.id,
          name: song.name,
          order: index + 1,
          picUrl: song.al.picUrl,
          artists: song.ar.map((ar: any) => ar.name).join("/"),
          album: song.al.name,
          duration: song.dt,
        };
      });

      return {
        id: playlist.id,
        name: playlist.name,
        createTime: playlist.createTime,
        coverImgUrl: playlist.coverImgUrl,
        description: playlist.description,
        avatarUrl: creator.avatarUrl,
        nickname: creator.nickname,
        commentCount: playlist.commentCount,
        tags: tags.join("/"),
        songs: transSongs,
      };
    }
  );
};

// 歌曲详情
export const getSongDetail = (params: { ids: string }) => {
  return getRequest(REQUEST_URL.SongDetail, params);
};
