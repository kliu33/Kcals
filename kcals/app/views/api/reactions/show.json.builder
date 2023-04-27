json.reaction do
  json.partial! 'api/reactions/reaction', reaction: reaction
end

json.user do 
  json.partial! 'api/users/user', user: reaction.user
end