from flask import Flask, request, jsonify
from gensim.models.word2vec import Word2Vec
import json
import os

app = Flask(__name__)
model_path = './content/word2vec.gensim.model'

# モデルの読み込み
w2v_model = None
try:
    w2v_model = Word2Vec.load(model_path)
except Exception as e:
    print(f"Error loading Word2Vec model: {e}")

@app.route('/word', methods=['POST'])
def word():
    data = request.json
    arg1 = data.get('arg1')
    arg2 = data.get('arg2')
    arg3 = data.get('arg3')

    arg1_list = [item.strip() for item in arg1.split(',')]
    arg2_list = [item.strip() for item in arg2.split(',')]    


    if (arg3 == true):
        result = w2v_model.wv.most_similar(positive=arg1_list, negative=arg2_list)
    else:
        result = w2v_model.wv.most_similar(positive=arg1_list)
    
    if result:
        return str(result[0][0])
    else:
        return "No similar word found."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5008)
