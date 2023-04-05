class RemoveChannel < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :channel_id
  end
end
