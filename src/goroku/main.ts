import axios from 'axios';

interface MyData {
  high: string[];
  mid: string[];
}

interface Result {
  found: boolean;
  High: string[];
  Mid: string[];
}

async function fetchData(url: string): Promise<MyData[]> {
  try {
    const response = await axios.get<MyData[]>(url);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('エラー:', error.message);
    } else {
      console.error('不明なエラーが発生しました:', error);
    }
    throw error;
  }
}

export async function gorokuc(text: string): Promise<Result> {
  const url = 'https://raw.githubusercontent.com/arkwnet/569/main/src/assets/list.json';

  try {
    const jsonData = await fetchData(url);

    // 例として、検索対象の文字列を指定して実行
    const result = searchAndPrint(jsonData, text);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error('エラー:', error.message);
    } else {
      console.error('不明なエラーが発生しました:', error);
    }
    throw error;
  }
}

function searchAndPrint(data: MyData[], input: string): Result {
  const foundInHigh: string[] = [];
  const foundInMid: string[] = [];

  for (const item of data) {
    item.high.forEach((highItem) => {
      if (input.includes(highItem)) {
        foundInHigh.push(highItem);
      }
    });

    item.mid.forEach((midItem) => {
      if (input.includes(midItem) && !foundInHigh.includes(midItem)) {
        foundInMid.push(midItem);
      }
    });
  }

  return {
    found: foundInHigh.length > 0 || foundInMid.length > 0,
    High: foundInHigh,
    Mid: foundInMid,
  };
}

// async function main() {
//   console.log(await goroku("14万3千円110弱でしょうねぇ1919"));
// }

// main(); 
