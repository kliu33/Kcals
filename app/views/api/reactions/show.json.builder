json.extract! reaction, 
    :id, 
    :emoji, 
    :user_id,
    :message_id,
    :created_at
json.partial! 'api/reactions/reaction', reaction: reaction