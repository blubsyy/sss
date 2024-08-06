module.exports = async (client) => {
    // Set presence with custom activity when the bot is ready
    client.once('ready', () => {
        try {
            // Set presence with custom activity
            client.user.setPresence({
                activities: [
                    { name: 'Raw & Wine Marriage ', type: 'WATCHING' },
                    
                    
                ],
                status: 'dnd'
            });

            console.log(`Logged in as ${client.user.tag}`);
            client.logger.log('Presence set successfully', 'ready');
        } catch (error) {
            console.error('Error setting presence:', error);
            client.logger.error('Error setting presence', error);
        }
    });

    
    client.on('messageCreate', async message => {
        
        if (message.content.trim() === '<@747321055319949312>') {
            
            try {
                await message.react('<a:snowpapa:1258871908754129017>');
                console.log('Reacted with emoji');
            } catch (error) {
                console.error('Failed to react with emoji:', error);
            }
        }
    });
};
