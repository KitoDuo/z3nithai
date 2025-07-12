import React, { useMemo } from 'react';

// Basic list of "stop words" to exclude from the word cloud
const stopWords = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
  'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
  'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
  'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
  'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
  'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
  'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'd', 'll', 'm', 'o', 're', 've', 'y'
]);


const JournalWordCloud = ({ entries }) => {
  const wordFrequencies = useMemo(() => {
    if (!entries || entries.length === 0) return [];

    const wordCounts = entries.reduce((acc, entry) => {
      const words = entry.content.toLowerCase().match(/\b(\w+)\b/g) || [];
      words.forEach(word => {
        if (!stopWords.has(word) && word.length > 2) {
          acc[word] = (acc[word] || 0) + 1;
        }
      });
      return acc;
    }, {});

    return Object.entries(wordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15); // Get top 15 words
  }, [entries]);

  if (wordFrequencies.length === 0) {
      return (
          <div className="flex items-center justify-center h-full">
              <p className="text-zenith-gray-500 text-center">Start writing in your journal to see your most used words appear here.</p>
          </div>
      )
  }

  const maxFreq = wordFrequencies.length > 0 ? wordFrequencies[0][1] : 1;

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center h-full">
      {wordFrequencies.map(([word, freq]) => {
        const fontSize = 1 + (freq / maxFreq) * 1.5; // Font size from 1rem to 2.5rem
        const opacity = 0.5 + (freq / maxFreq) * 0.5; // Opacity from 0.5 to 1
        return (
          <span
            key={word}
            className="font-display text-zenith-gray-700"
            style={{
                fontSize: `${fontSize}rem`,
                opacity: opacity,
                lineHeight: '1.2',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export default JournalWordCloud;
