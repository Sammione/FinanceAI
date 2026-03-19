require('dotenv').config();
const { OpenAI } = require('openai');
const openai = new OpenAI();
async function test(model){
  try{
    await openai.chat.completions.create({
      model: model, 
      messages:[{role:'user',content:'{ "a": 1 }'}], 
      response_format:{type:'json_object'}
    }); 
    console.log(model, 'SUCCESS');
  }catch(e){
    console.log(model, 'ERROR', e.message);
  }
}
async function run() {
  await test('gpt-4-0613'); 
  await test('gpt-4o'); 
  await test('gpt-4o-mini');
  await test('gpt-5.4');
}
run();
