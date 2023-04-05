class CreateDirectMessageChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_message_channels do |t|
      t.references :user1, null: false, foreign_key: {to_table: :users}
      t.references :user2, null: false, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
