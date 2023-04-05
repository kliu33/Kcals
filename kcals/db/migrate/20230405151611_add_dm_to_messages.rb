class AddDmToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :channel_id, :bigint, null: true, foreign_key: true
    add_column :messages, :direct_message_channel_id, :bigint, null: true, foreign_key: true
  end
end
