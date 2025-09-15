import express from 'express';
import TypesData from './types.json' with { type: 'json' };
export const router = express.Router();

router.get('/types', (req, res) => {
    try {
        const typesMap = new Map(
            Object.entries(TypesData).map(([type, effectiveness]) => [
                type,
                new Map(Object.entries(effectiveness))
            ])
        );

        const typesObject = Object.fromEntries(
            Array.from(typesMap.entries()).map(([type, effectivenessMap]) => [
                type,
                Object.fromEntries(effectivenessMap)
            ])
        );

        res.json({ types: typesObject });

    } catch (err) {
        console.error('API endpoint error:', err);
        res.status(500).json({ message: 'API Error.' });
    }
});

export default router;